// Re-encode a video for the web (macOS, no extra installs).
// swift transcode.swift <in> <out.mp4> <startSec> <durSec|0=all> <width> <height> <videoBitrate> <audio 0|1>
import AVFoundation
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let out = URL(fileURLWithPath: a[2]); try? FileManager.default.removeItem(at: out)
let start = Double(a[3])!, durArg = Double(a[4])!, W = Int(a[5])!, H = Int(a[6])!, vbr = Int(a[7])!, withAudio = a[8] == "1"
let total = asset.duration.seconds
let range = CMTimeRange(start: CMTime(seconds: start, preferredTimescale: 600), duration: CMTime(seconds: durArg > 0 ? durArg : total - start, preferredTimescale: 600))
let reader = try! AVAssetReader(asset: asset); reader.timeRange = range
let writer = try! AVAssetWriter(outputURL: out, fileType: .mp4); writer.shouldOptimizeForNetworkUse = true
let vt = asset.tracks(withMediaType: .video)[0]
let vOut = AVAssetReaderTrackOutput(track: vt, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]); reader.add(vOut)
let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: W, AVVideoHeightKey: H,
  AVVideoScalingModeKey: AVVideoScalingModeResizeAspectFill,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: vbr, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel, AVVideoMaxKeyFrameIntervalKey: 48]])
vIn.expectsMediaDataInRealTime = false; writer.add(vIn)
var aOut: AVAssetReaderTrackOutput? = nil; var aIn: AVAssetWriterInput? = nil
if withAudio, let at = asset.tracks(withMediaType: .audio).first {
  aOut = AVAssetReaderTrackOutput(track: at, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM]); reader.add(aOut!)
  aIn = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVNumberOfChannelsKey: 2, AVSampleRateKey: 48000, AVEncoderBitRateKey: 192000]); writer.add(aIn!)
}
reader.startReading(); writer.startWriting(); writer.startSession(atSourceTime: range.start)
let g = DispatchGroup()
func pump(_ o: AVAssetReaderTrackOutput, _ i: AVAssetWriterInput, _ q: String) {
  g.enter()
  i.requestMediaDataWhenReady(on: DispatchQueue(label: q)) {
    while i.isReadyForMoreMediaData {
      if let s = o.copyNextSampleBuffer() { i.append(s) } else { i.markAsFinished(); g.leave(); return }
    }
  }
}
pump(vOut, vIn, "v"); if let ao = aOut, let ai = aIn { pump(ao, ai, "a") }
g.wait()
let sem = DispatchSemaphore(value: 0); writer.finishWriting { sem.signal() }; sem.wait()
print(writer.status == .completed ? "ok" : "failed \(String(describing: writer.error)) \(String(describing: reader.error))")

// Join clips end to end (video only): swift tools/video/concat.swift out.mp4 a.mp4 b.mp4 ...
import AVFoundation
let args = CommandLine.arguments
let out = URL(fileURLWithPath: args[1])
let comp = AVMutableComposition()
let track = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
var cursor = CMTime.zero
let sem = DispatchSemaphore(value: 0)
Task {
  for p in args.dropFirst(2) {
    let asset = AVURLAsset(url: URL(fileURLWithPath: p))
    let dur = try await asset.load(.duration)
    let src = try await asset.loadTracks(withMediaType: .video)[0]
    try track.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: src, at: cursor)
    cursor = cursor + dur
  }
  try? FileManager.default.removeItem(at: out)
  let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPreset1280x720)!
  ex.outputURL = out; ex.outputFileType = .mp4; ex.shouldOptimizeForNetworkUse = true
  await ex.export()
  print(ex.status == .completed ? "done \(cursor.seconds)s" : "failed \(String(describing: ex.error))")
  sem.signal()
}
sem.wait()

// Save still frames from a video. swift frames.swift <in> <outDir> <prefix> <t1,t2,...> <maxWidth>
import AVFoundation
import AppKit
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1])); let outDir = a[2]; let prefix = a[3]
let maxW = a.count > 5 ? (Double(a[5]) ?? 320) : 320
let gen = AVAssetImageGenerator(asset: asset); gen.appliesPreferredTrackTransform = true
gen.maximumSize = CGSize(width: maxW, height: maxW)
gen.requestedTimeToleranceBefore = .zero; gen.requestedTimeToleranceAfter = .zero
for t in a[4].split(separator: ",").compactMap({ Double($0) }) {
  if let cg = try? gen.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil) {
    let d = NSBitmapImageRep(cgImage: cg).representation(using: .jpeg, properties: [.compressionFactor: 0.85])!
    try? d.write(to: URL(fileURLWithPath: "\(outDir)/\(prefix)-\(Int(t*10)).jpg"))
  }
}
print("done")

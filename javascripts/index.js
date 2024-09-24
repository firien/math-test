import SignaturePad from 'signature_pad'

const canvas = document.querySelector('canvas')
const signaturePad = new SignaturePad(canvas)
const textDetector = new TextDetector()

signaturePad.addEventListener('endStroke', async () => {
  // console.log("Signature started")
  canvas.toBlob(async (blob) => {
    const texts = await textDetector.detect(blob)
    console.log(texts)
  })
  const target = new Image()
  target.src = canvas.toDataURL()
  target.onload = async () => {
    const texts = await textDetector.detect(target)
    console.log(texts)
  }
  // document.body.appendChild(target)
})

// const ctx = canvas.getContext('2d')

// const mover = (e) => {
//   console.log(e)
//   ctx
// }

// const stop = (e) => {
//   document.removeEventListener('pointermove', mover)
//   document.removeEventListener('pointerup', stop)
// }

// canvas.addEventListener('pointerdown', (e) => {
//   document.addEventListener('pointermove', mover)
//   document.addEventListener('pointerup', stop)
// })

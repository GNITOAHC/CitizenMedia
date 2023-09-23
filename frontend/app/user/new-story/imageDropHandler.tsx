import { Slice } from '@tiptap/pm/model'
import { EditorView } from '@tiptap/pm/view'

export function imageDropHandler(
  view: EditorView,
  event: DragEvent,
  _slice: Slice,
  moved: boolean
): boolean | undefined {
  // Define uploadImage function here
  const uploadImage = async (file: File): Promise<string> => {
    return 'http://localhost:80/display?_id=650eda84c4bf25c4e827b1fd&collection=avatar'
  }

  // If dropping external files to the editor
  if (
    !moved &&
    event.dataTransfer &&
    event.dataTransfer.files &&
    event.dataTransfer.files[0]
  ) {
    let droppedFile = event.dataTransfer.files[0]
    let droppedFileSize = droppedFile.size / 1024 / 1024 // MB
    let droppedFileType = droppedFile.type
    if (
      (droppedFileType === 'image/jpeg' || droppedFileType === 'image/png') &&
      droppedFileSize < 10
    ) {
      let _URL = window.URL || window.webkitURL
      let img = new Image() /* global Image */
      img.src = _URL.createObjectURL(droppedFile)
      img.onload = function () {
        if (img.width > 5000 || img.height > 5000) {
          window.alert(
            'Your images need to be less than 5000 pixels in height and width.'
          )
        } else {
          // Upload valid image
          try {
            const response = uploadImage(droppedFile)
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            })
            if (!coordinates) {
              console.log('No coordinates')
              return false
            }
            view.dispatch(
              view.state.tr.insert(
                coordinates.pos,
                view.state.schema.nodes.image.create({ src: response })
              )
            )
          } catch (err) {
            console.log(err)
            return false
          }
        }
      }
    } else {
      window.alert(
        'Your image needs to be a jpeg or png and less than 10MB in size.'
      )
    }

    return true
  }
  return false
}

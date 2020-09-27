import { Editor } from "@tinymce/tinymce-react"

interface IProps {
    name: string
    value: string
    onChange: (name: string, value: string) => void
}

const TextEditor = ({ name, value, onChange }: IProps) => {
    return (
        <Editor
            id={name}
            value={value}
            apiKey={process.env.NEXT_PUBLIC_TMCE_KEY || ''}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: `undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help`,
                invalid_elements: 'script'
            }}
            onEditorChange={(value) => onChange(name, value)}
        />
    )
}

export default TextEditor
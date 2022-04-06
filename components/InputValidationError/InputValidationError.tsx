interface validationErrorProps {
  errorClassName: string
}

export default function InputValidationError(props: validationErrorProps) {

  return (
    <>
      <div className="absolute top-14 mt-8 bg-red-200 text-red-900 rounded">
        <p className={props.errorClassName === 'empty' ? `px-4 py-2 h-10` : `hidden`}>
          The input can not be empty!
        </p>
        <p className={props.errorClassName === 'invalid' ? `px-4 py-2 h-10` : `hidden`}>
          Please enter a valid ingredient!
        </p>
        <p className={props.errorClassName === 'duplicate' ? `px-4 py-2 h-10` : `hidden`}>
          You have already entered the ingredient!
        </p>
      </div>
    </>
  )
}

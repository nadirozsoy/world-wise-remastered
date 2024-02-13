const Message = ({ message }: { message: string }) => {
  return (
    <div className='flex-center gap-2 text-sm'>
      <span role='img' aria-label='img'>
        🙌
      </span>
      {message}
    </div>
  )
}

export default Message

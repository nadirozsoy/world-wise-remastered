const ItemLength = ({ length, desc }: { length: number; desc: string }) => {
  return (
    <>
      <span className='ml-auto mt-7 inline-block text-sm'>
        {length} {desc}
      </span>
    </>
  )
}

export default ItemLength

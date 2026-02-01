import React from 'react'

const ContactInfo = ({icon,iconBG,value}) => {
  return (
   <div className='flex items-center gap-2'>
    <div className='w-[30px] h-[30px] items-center px-2 py-1.5 justify-center rounded-full'
    style={{backgroundColor:iconBG}}>
        {icon}
    </div>
    <p className='flex-1 text-[12px] font-medium break-all'>{value}</p>
   </div>
  )
}

export default ContactInfo
import React from 'react'


const COLORS = {
    gray: 'text-[#A5A5A5]',
}
const CompanyAppearance = () => {
  return (
    <div>
    
    <div><p className='text-[20px] font-Lato font-bold mt-2 mb-4'>Appearance</p></div>

    <div className="rounded-lg bg-white px-5 py-6 shadow-[0px_2px_3px_#00000029]">
            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                {/* col 1 */}
                <div>
                    <p className="text-18px font-bold text-text-black">Name*</p>
                    <p className={'mt-2.5 ' + COLORS.gray}>Your company name e.g. Alcor</p>
                </div>

                {/* col 2 */}
                <div>
                    <div
                        className={
                            'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray
                        }
                    >
                        <input
                            className={
                                'w-full bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                            }
                            // value={} 
                            // onChange={}
                        />
                    </div> 
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                {/* col 1 */}
                <div>
                    <p className="text-18px font-bold text-text-black">Logo</p>
                    <span className={'mt-2.5 ' + COLORS.gray}>Logo Dimension 350x160px</span>
                    <p className={COLORS.gray}>Maximum file size 50kb</p>
                </div>

                {/* col 2 */}
                <div>
                    <div className={'rounded ring-primary focus-within:ring-1 ' + COLORS.gray}>
                        <label htmlFor="companyLogo" className="cursor-pointer">
                            <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-14 ">
                                <input
                                    id="companyLogo"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                                <label htmlFor="companyLogo" className="bg-[#5486E3] py-2 px-4 text-white rounded-md cursor-pointer">
                                Choose File
                                </label>
                                <span className="text-gray-500">
                                  {'or drop your file here'}  
                                </span>
                                
                            </div>
                        </label>
                    </div>
                </div>
            </div>
    </div>

    <div className='flex w-full justify-end mt-4'>
     <button className='bg-primary px-4 rounded-md text-center py-1 text-[#fff] cursor-pointer'>Save Settings</button>
    </div>

    </div>
  )
}

export default CompanyAppearance
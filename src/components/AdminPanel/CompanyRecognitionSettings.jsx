import React from 'react'


const COLORS = {
    gray: 'text-[#A5A5A5]',
}

const CompanyRecognitionSettings = () => {
    return (
        <div>
        
        <div><p className='text-[20px] font-Lato font-bold mt-2 mb-4'>Recognition Settings</p></div>
    
        <div className="rounded-lg bg-white px-5 py-6 shadow-[0px_2px_3px_#00000029]">
                <div className="flex flex-col md:flex-row  items-center gap-8">
                    {/* col 1 */}
                    <div className='w-[40%]'>
                        <p className="text-18px font-bold text-text-black">Monthly Allowance</p>
                        <p className={'mt-2.5 ' + COLORS.gray}>We recommend an initial allocation of 100,</p>
                        <p className={COLORS.gray}>with an average utilization of approximately 60%.</p>
                    </div>
    
                    {/* col 2 */}
                    <div className='flex flex-row gap-4 items-center'>
                        <div
                            className={
                                ' rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray
                            }
                        >
                            <input
                                className={
                                    'w-20 bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                                }
                                type='number'
                            />
                            
                        </div> 
                        <span>Points</span>
                    </div>
                </div>
    
                <hr className="border-px my-6 border-400" />
    
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* col 1 */}
                    <div className='w-[40%]'>
                        <p className="text-18px font-bold text-text-black">Exchange Rates</p>
                    </div>
    
                    {/* col 2 */}
                    <div>
                       <p className='pb-2'>*Exchange value is 10 per points</p>
                        <div
                            className={'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray}>
                           <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th>Region</th>
                                        <th>Exchange Value</th>
                                    </tr>
                                    </thead>
                                <tbody>
                                    <tr>
                                        <td className='pl-[9px]'>USA</td>
                                        <td className='pl-[19px]'>$0.05</td>
                                    </tr>
                                    <tr>
                                        <td className='pl-[9px]'>India</td>
                                        <td className='pl-[19px]'>$1</td>
                                    </tr>
                                </tbody>
                           </table>
                        </div> 
                        <button className='text-primary pt-2'>Edit/Define exchange rate</button>
                    </div>
                </div>

                <hr className="border-px my-6 border-400" />

                <div className="flex flex-col md:flex-row items-center gap-8">
                {/* col 1 */}
                <div className='w-[40%]'>
                    <p className="text-18px font-bold text-text-black">Add Appreciation Hashtags</p>
                    <p className={'mt-2.5 ' + COLORS.gray}>You can include Appreciation Hashtags.</p>
                    <p className={COLORS.gray}>For multi-word hashtags, consider using dashes</p>
                    <p className={COLORS.gray}>or underscores *_* for clarity #Spotlight-On-Excellence.</p>
                </div>

                {/* col 2 */}
                <div>
                    <div className={'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray}>
                        <input
                            className={'w-80 bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'}
                            type='text'
                            placeholder='#Unique-Appreciation-Hashtag'
                        />
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

export default CompanyRecognitionSettings
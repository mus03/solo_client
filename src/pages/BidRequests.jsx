import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import useAuth from "../hooks/useAuth";

const BidRequests = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
const queryClient = useQueryClient()
  const {
    data: bids = [], //usestate er empty array
    isLoading, 
    refetch, 
    isError, 
    error }=
    useQuery({
    queryFn:()=>getData(),
    queryKey: ['bids',user?.email]

  }) 

  // const [bids,setBids] = useState([]);
  const getData = async () => {
    const {data} = await axiosSecure (`/bid-requests/${user?.email}`)
    return data
       }
  // useEffect(()=>
  //     {   
  //     getData()
  //     },[user])

const {mutateAsync}= useMutation({
  mutationFn:async ({id,status})=>{
    const {data} =await axiosSecure.patch(`/bid/${id}`,{status})
    console.log(data)
  },
 onSuccess:()=>{
  console.log("Wow!! data updated")
  toast.success("Updated")
  //refresh the ui
  // refetch() (only ei component ei update hobe)
  // kothin (shob component e jaye refetch or update hobe)
  queryClient.invalidateQueries({queryKey: ['bids']}) 
 }
})

const handleStatus=async (id,prevStatus,status)=>{
  if(prevStatus===status) return toast.error("Eta hobe nh")
console.log(id,prevStatus,status)
getData()
await mutateAsync({id,status})

}
     if(isLoading) return <p>Data is still loading.........</p>
     if(isError || error) {
      console.log(isError, error)
     }
    return (
      <section className='container px-4 mx-auto pt-12'>
        <div className='flex items-center gap-x-3'>
          <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>
  
          <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
            {bids.length} Requests
          </span>
        </div>
  
        <div className='flex flex-col mt-6'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                      >
                        <div className='flex items-center gap-x-3'>
                          <span>Title</span>
                        </div>
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                      >
                        <div className='flex items-center gap-x-3'>
                          <span>Email</span>
                        </div>
                      </th>
  
                      <th
                        scope='col'
                        className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                      >
                        <span>Deadline</span>
                      </th>
  
                      <th
                        scope='col'
                        className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                      >
                        <button className='flex items-center gap-x-2'>
                          <span>Price</span>
                        </button>
                      </th>
  
                      <th
                        scope='col'
                        className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                      >
                        Category
                      </th>
  
                      <th
                        scope='col'
                        className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                      >
                        Status
                      </th>
  
                      <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200 '>
                    {bids.map(bid=>(
                      <tr key={bid._id}>
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {bid.job_title}
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {bid.email}
                      </td>
  
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        10/04/2024
                      </td>
  
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        ${bid.price}
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                        <div className='flex items-center gap-x-2'>
                        <p
                              className={`px-3 py-1 rounded-full 
                              ${bid.category==='Web Development' && 'text-blue-500 bg-blue-100/60'}
                              ${bid.category==='Graphics Design' && 'text-emerald-500 bg-emerald-100/60'}
                              ${bid.category==='Digital Marketing' && 'text-pink-500 bg-pink-100/60'}
                               text-xs`}
                            >
                            {bid.category}
                          </p>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                            ${bid.status==='Pending' && 'bg-yellow-100/60 text-yellow-500'}
                            ${bid.status==='In Progress' && 'text-blue-500 bg-blue-100/60'}
                            ${bid.status==='Complete' && 'text-emerald-500 bg-emerald-100/60'}
                            ${bid.status==='Rejected' && 'text-red-500 bg-red-100/60'}
                            `}>
                            <span className={`h-1.5 w-1.5 rounded-full 
                                ${bid.status==='Pending' && 'bg-yellow-500'}
                                ${bid.status==='In Progress' && 'bg-green-500'}
                                ${bid.status==='Complete' && 'bg-green-500'}
                                ${bid.status==='Rejected' && 'bg-red-500'}`}></span>
                          <h2 className='text-sm font-normal '>{bid.status}</h2>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                        <div className='flex items-center gap-x-6'>
                          <button 
                          onClick={()=>
                            handleStatus(bid._id,bid.status,'In Progress')}
                            disabled={bid.status==='Completed'}
                          className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m4.5 12.75 6 6 9-13.5'
                              />
                            </svg>
                          </button>
  
                          <button 
                          onClick={()=>
                            handleStatus(bid._id,bid.status,'Rejected')}
                            disabled={bid.status==='Completed'}
                          className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default BidRequests
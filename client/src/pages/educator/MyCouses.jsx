import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/students/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyCouses = () => {
  const { currency, backendUrl, isEducator,getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      console.log(token);
      const {data}=  await axios.get(backendUrl + '/api/educator/courses',{headers:{Authorization:`Bearer ${token}`}});
      data.success && setCourses(data.courses);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  
  if (!courses) {
    return <Loading />;
  }

  return (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='md:table-auto table-fixed w-full overflow-hidden'>
          <table className='w-full'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published On</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {courses.map((item) => (
                <tr key={item._id} className='border-b border-gray-500/20'>
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-4 truncate'>
                    <img src={item.courseThumbnail} alt="course" className='w-16' />
                    <span className='truncate hidden md:block'>
                      {item.courseTitle}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    {currency}{' '}
                    {Math.floor(
                      (item.enrolledStudents?.length || 0) *
                      (item.coursePrice - (item.discount * item.coursePrice) / 100)
                    )}
                  </td>
                  <td className='px-4 py-3'>{item.enrolledStudents?.length || 0}</td>
                  <td className='px-4 py-3'>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCouses;

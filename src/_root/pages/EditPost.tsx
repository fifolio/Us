import PostForm from '@/components/forms/PostForm'
import { useParams } from 'react-router-dom';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';

const EditPost = () => {

  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);
  if (isLoading) return (<div className="w-full text-center">Loading...</div>);

  return (
    <div className="flex flex-1">
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src="/assets/icons/add-post.svg" alt="add" width="35" height="35" />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        {isLoading ? 'Loading...' : <PostForm action="Update" post={post} />}
      </div>
    </div>
  )
}

export default EditPost
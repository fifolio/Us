import { Models } from "appwrite"
import React, { useState, useEffect } from 'react';
import { useDeleteSavePost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations"
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
  post?: Models.Document,
  userId: string,
  isGrid?: booleanو
}

export default function PostStats({ post, userId, isGrid }: PostStatsProps) {

  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeletingSaved } = useDeleteSavePost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.user.$id === post?.$id);

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);


  const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((id) => id !== userId)
    } else {
      likesArray.push(userId)
    }

    setLikes(likesArray);
    likePost({ postId: post?.$id || '', likesArray })
  };


  const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavePost(savedPostRecord.$id);
    } else {
      savePost({ userId: userId, postId: post?.$id || ''});
      setIsSaved(true);
    }
  }


  return (
    <div className="flex justify-between itmes-center z-20">
      <div className="flex gap-2 mr-5">
        <img src={checkIsLiked(likes, userId) ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'} alt="like" width={20} height={20} onClick={handleLikePost} className={`cursor-pointer`} />
        <p className={`small-medium lg:base-medium ${isGrid && 'text-light-1'}`}>
          {likes.length}
        </p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? 'wait...' : <img src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'} alt="like" width={20} height={20} onClick={handleSavePost} className="cursor-pointer" />}
      </div>
    </div>
  )
}

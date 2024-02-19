import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean,
  searchedPost: any;
}

export default function SearchResults({ isSearchFetching, searchedPost }: SearchResultsProps) {

  if (isSearchFetching) return 'Loading...';

  if (searchedPost && searchedPost.documents.length > 0) {

    return (
      <GridPostList posts={searchedPost.documents}/>
    )
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}

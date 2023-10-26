import PhotosListItem from './PhotosListItem';

import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

function PhotosList({ album }) {
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();
  const handleAddPhoto = () => {
    addPhoto(album);
  };
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  let content;
  if (isFetching) {
    content = <Skeleton times={4} className="h-8 w-8"></Skeleton>;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo}></PhotosListItem>;
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}
export default PhotosList;

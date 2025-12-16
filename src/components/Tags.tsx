import { useEffect, useState } from 'react';
import axios from 'axios';

interface Tag {
  id: number;
  name: string;
}

export const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  console.log('tags', tags);
  useEffect(() => {
    console.log('useEffect');
    axios.get('http://localhost:3004/tags').then((res) => {
      console.log('res', res.data);
      setTags(res.data);
    });
  }, []);

  return (
    <>
      {tags.map((tag) => (
        <div key={tag.id} role='treeitem'>
          {tag.name}
        </div>
      ))}
    </>
  );
};

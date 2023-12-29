import React, { useState } from 'react';
import './Timeline.css';
import Suggestions from './Suggestions';
import Post from './posts/Post';

function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: 'nickname__',
      postImage:
        'https://images.mypetlife.co.kr/content/uploads/2019/08/09153128/shutterstock_119617003.jpg',
      likes: 12,
      timestamp: '2d',
    },
    {
      user: 'nickname1__',
      postImage:
        'https://3.bp.blogspot.com/-_EbA49aWwxw/V1kZwpzCW5I/AAAAAAAAP4k/d_l1i4ydDPA5HitIyvdZ0WSTyBWUS3FUgCLcB/s280/%25ED%258F%25AC%25EB%25A7%25B7%25EB%25B3%2580%25ED%2599%2598_2.png',
      likes: 56,
      timestamp: '12h',
    },
    {
      user: 'nickname2__',
      postImage:
        'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
      likes: 32,
      timestamp: '3h',
    },
    {
      user: 'nickname3__',
      postImage:
        'https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg',
      likes: 456,
      timestamp: '1d',
    },
    {
      user: 'nickname4__',
      postImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ua4lBgOv8yB4F98zDtuw3C7fzlMqNAzpYw&usqp=CAU',
      likes: 27,
      timestamp: '11h',
    },
  ]);
  return (
    <div className='timeline'>
      <div className='timeline__left'>
        <div className='timeline__posts'>
          {posts.map((post) => (
            <Post
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      </div>
      <div className='timeline__right'>
        <Suggestions />
      </div>
    </div>
  );
}

export default Timeline;

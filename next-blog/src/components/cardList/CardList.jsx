import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";



const POSTS_PER_PAGE = 2;

const getData = async (page, cat) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return { posts: [], count: 0 }; // Return empty data on error
  }
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const hasPrev = POSTS_PER_PAGE * (page - 1) > 0;
  const hasNext = POSTS_PER_PAGE * (page - 1) + POSTS_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      {posts.length > 0 ? (
        <div className={styles.posts}>
          {posts.map((item) => (
            <Card item={item} key={item._id} />
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;

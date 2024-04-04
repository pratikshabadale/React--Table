import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import "./table.css";
function InfiniteScrollTable() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async (__page) => {
    console.log(__page);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    setItems([...items, ...response.data]);
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      style={{ margin: "10px" }}
      pageStart={0}
      loadMore={fetchData}
      hasMore={true}
      loader={
        <div className='loader' key={0}>
          Loading ...
        </div>
      }
    >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

export default InfiniteScrollTable;

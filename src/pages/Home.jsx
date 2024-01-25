import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h1 className='primary'>
        Home
      </h1>
    </div>
  )
}

export default Home
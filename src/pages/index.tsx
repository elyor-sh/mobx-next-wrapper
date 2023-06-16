import { observer } from "mobx-react-lite";
import {useStore, withGSSP} from "@/store";

function Home() {

  const {bookStore} = useStore()

  return (
    <h1>
     {bookStore?.booksCount}
    </h1>
  )
}

export const getServerSideProps = withGSSP<unknown>(  async () => {
  return {
    props: {
      initialState: {
        key: 'bookStore',
        value: 37
      }
    }
  }
})

export default observer(Home);

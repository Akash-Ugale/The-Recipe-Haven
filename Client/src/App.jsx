import "./App.css"
import BackImage from "./assets/akash-coding.jpg"
import Navbar from '../components/navbar'





function App() {
  return (
     
    <div className='App'>
      <Navbar/>
      
      <div className="main-component">
        <div className="left-div">
          <h1>Flavors Unleashed - Explore,Cook,Share</h1>
          <p>A vibrant community-driven-sharing platform where food lovers can explore, create and share their favorite dishes.
              From quick bites to gourmet delights, find step-by-step guides, connect with fellow food enthusiasts,and bring culinary
                               inspirations to life </p>
          <button onClick={() => (window.location.href = "/register")}>
  Get Started
</button>
      
        </div>
        <div className="right-div">
          <img src={BackImage} alt="user" />

        </div>

      </div>
    </div>
  )
}

export default App

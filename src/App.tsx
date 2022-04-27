import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './web_pages/signin.page';
import BlogHomePage from './web_pages/home.page';
import SignUpPage from './web_pages/signup.page';
import CreateOrUpdateBlog from './web_pages/createOrUpdateBlog.page';
import ProfilePage from './web_pages/profile.page';
import MyBlogPage from './web_pages/myBlog.page';
import UpdateBlog from './web_pages/updateBlog.page';

function App() {
  return (
    
      <div className="container">
       <BrowserRouter>
       <Routes>
       <Route path='/' element={<SignInPage/>}/>
       <Route path='/Home' element={<BlogHomePage/>}/>
       <Route path='/SignUp' element= {<SignUpPage/>}/>
       <Route path='/Update-blog/:id' element={<UpdateBlog/>}/>
       <Route path='/createOrUpdate-blog' element={<CreateOrUpdateBlog/>}/>
       <Route path='/profile' element={<ProfilePage/>}/>
       <Route path='/my-blogs' element={<MyBlogPage/>}/>
       
       </Routes>
       </BrowserRouter>
      </div>
    
  );
}

export default App;

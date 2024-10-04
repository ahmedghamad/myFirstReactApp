import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
const history = useHistory()


  const handleTextChange = event =>{
    setTitle(event.target.value)
  }
  const handleBodyChange = event =>{
    setBody(event.target.value)
  }

  const handleSumbmit = (e)=>{
    e.preventDefault()

    const blog ={title, body, author};

    setIsPending(true);

    fetch('http://localhost:8000/blogs',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(blog)
    }).then(() =>{
      console.log('Blog saved')
      setIsPending(false)
      history.push('/')
    })
  }

    return (
      <div className="create">
        <h2>Add a New Blog</h2>
        <form onSubmit={handleSumbmit}>
          <label>Blog title:</label>
          <input
          type= 'text'
          required
          value={title}
          onChange={handleTextChange}
          
          ></input>

        <label>Blog body:</label>
      <textarea
      value={body} 
      onChange={handleBodyChange}
      required
      ></textarea>
      <label>Blog author:</label>
      <select 
      value={author}
      onChange={(e)=>setAuthor(e.target.value)}>
        <option value="mario">mario</option>
        <option value="yoshi">yoshi</option>
      </select>
     {!isPending && <button>Add blog</button>}
     {isPending && <button>Adding blog....</button>}
        </form>
      </div>
    );
  }
   
  export default Create;
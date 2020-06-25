import React, {useContext, useEffect, useRef} from 'react';
import {key} from "../../constants";
import {withRouter} from 'react-router'
import {SearchCollapse} from "./searchCollapse";
import './searchStyle.css'
import {DarkThemeContext} from "../../context/contexts";

function SearchComponent (props) {
    const [keyWord, setKeyWord] = React.useState('');
    const [searched, setSearched] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(true);

    const handler = (ev)=>{
        setKeyWord(ev.target.value);
        setIsOpen(true);
    };
    useEffect(()=>{
        if (keyWord === ''){
            return
        } else fetchSearch(keyWord)
    }, [keyWord]);

   const fetchSearch = async (word)=>{
        // setSearching(true);
        let arr = await fetch(`https://api.themoviedb.org/3/search/keyword?query=${word}&api_key=${key}`);
        let json = await arr.json();
        if (json.status) return ;
        json.results.length = 10;
       setSearched(json.results);
    };

   const onSearch = ()=>{
        const {func} = props;
        if (keyWord === '') return;
        setIsOpen(false);
    const {history} = props;
    history.push(`/search/1?keyword=${keyWord}`);
       setKeyWord('');
        func && func()
    };
   const onChoose = (str)=>{
       setKeyWord(str);
    };

    useEffect(()=>{
        document.addEventListener('click', onClose);
        return ()=>{
            document.removeEventListener('click', onClose)
        }
    }, []);

 const searchDropRef = useRef(null);
 const inputRef = useRef(null);

 const onClose = (event)=> {
     if (searchDropRef.current === null) return;
     if (searchDropRef && !searchDropRef.current.contains(event.target)){
         setIsOpen(false);
     }
     if (inputRef && inputRef.current.contains(event.target)) {
         setIsOpen(true);
     }
 };
const handlerKey = (event)=>{
        if(event.key === 'Enter'){
            event.preventDefault();
      onSearch()
        }
};
        const darkTheme = useContext(DarkThemeContext);
        return (
            <nav className="navbar navbar-light" >
                <form className="form-inline position-relative flex-nowrap" >
                    <input className="form-control mr-sm-2"
                           type="text"
                           value={keyWord}
                           size="15"
                           onChange={handler}
                           ref={inputRef}
                            onKeyPress={handlerKey}
                    />
                    <div ref={searchDropRef}>
                        {isOpen &&!!keyWord &&!!searched && <SearchCollapse searchList={searched} flag={darkTheme} func={onChoose}/>}
                    </div>
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={onSearch} type="button">Search</button>
                </form>
            </nav>
        );
}
export const Search = withRouter(SearchComponent);
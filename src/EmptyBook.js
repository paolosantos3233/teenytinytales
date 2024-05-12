import './Book.css';
import HTMLFlipBook from "react-pageflip";
import React from "react";

import book_cover from "./assets/book_cover.png";
import back_cover from "./assets/book_cover_back.png";
import back1_cover from "./assets/book_cover_back1.png";
import left_page from "./assets/book_page_left.png";
import right_page from "./assets/book_page_right.png";

const BookCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref}>
            <img className="PageImage" src={book_cover}/>
        </div>
    );
});

const BackCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref}>
            <img className="PageImage" src={back_cover}/>
        </div>
    );
});

const BackCover1 = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref}>
            <img className="PageImage" src={back1_cover}/>
        </div>
    );
});

const LeftPage = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <img className="PageImage" src={left_page}/>
                <div className="page-text">{props.textContent}</div>
            </div>
        </div>
    );
});

const RightPage = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <img className="PageImage" src={right_page}/>
                <div className="page-text">{props.textContent}</div>
            </div>
        </div>
    );
});

function EmptyBook(props) {

    return (
        <HTMLFlipBook
            width={550}
            height={733}
            maxShadowOpacity={0.5}
            showCover={true}
            usePortrait={false}
        >   
            <BookCover/>
            <BackCover/>
            <RightPage/>
            <LeftPage/>
            <BackCover1/>
            <BackCover/>
        </HTMLFlipBook>
    );
}

export default EmptyBook;
import React from 'react';
class MoreArticles extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleClick = () => {
        console.log('this is:', this);
    };

    render() {
        return (
            <button onClick={this.handleClick}>
                More Articles
            </button>
        );
    }
}
export default MoreArticles;
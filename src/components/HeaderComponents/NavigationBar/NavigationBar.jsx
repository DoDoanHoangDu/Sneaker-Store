import "./NavigationBar.css"

function NavigationBar() {
  return (
    <div className="nav-bar">
        <a className="nav-option" href="/">Home</a>
        <a className="nav-option" href="/store">Store</a>
        <a className="nav-option" href="/about">About</a>
    </div>
        
  );
}

export default NavigationBar;

import find from "./find.svg";
import prevPage from "./prevPage.svg";
import logo from "./header/logo.svg";
import logOut from "./header/logOut.svg";
import yes from "./yes.svg";
import no from "./no.svg";

export const Logo = () => <img src={logo} alt="logo" />;
export const FindIcon = () => <img src={find} alt="find" className="find__image" />;
export const PrevPage = () => <img src={prevPage} alt="prevPage" />;
export const LogOut = () => <img style={{cursor: 'pointer'}} src={logOut} alt="logOut" />;
export const Yes = () => <img src={yes} alt="yes" />;
export const No = () => <img src={no} alt="no" />;

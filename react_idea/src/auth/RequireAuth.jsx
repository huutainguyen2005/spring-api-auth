import {useEffect} from "react";
import {Alert, Container} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {useAuth} from "./AuthContext";

export function RequireAuth({children}) {
    const location = useLocation();
    const {isAuthenticated, login} = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            login(location.pathname);
        }
    }, [isAuthenticated, login, location.pathname]);

    if (!isAuthenticated) {
        return (
            <Container className="mt-3">
                <Alert variant="warning">Redirecting to OAuth2 login...</Alert>
            </Container>
        );
    }

    return children;
}

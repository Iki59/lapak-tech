import {Navbar, Container, Nav, Image, Button, Dropdown} from "react-bootstrap"

export default function Header() {

    return(
        <>
        <Navbar style={{background:"#04024B"}}>
            <Container>
                <Navbar.Brand className="text-white fw-bold">Lapak Tech</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}
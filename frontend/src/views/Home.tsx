import React from 'react';
import {
    Container
} from "reactstrap";

function Dashboard() {
    return (
        <div>
            <div className="page-header header-filter">
                <Container>
                    <div className="content-center brand">
                        <h1 className="h1-seo">Gym Tabler</h1>
                        <h3 className="d-none d-sm-block">
                            Commit to be fit. Anytime. Anywhere.
                        </h3>
                    </div>
                </Container>
            </div>
            <div className="section section-examples" data-background-color="black">
                <div className="space-50" />
                <h3 className="text-center d-sm-block">
                    About
                </h3>
                <span className="text-center d-sm-block" style={{ margin: '15em', marginTop: '8em' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </span>
            </div>
        </div>
    );
}

export default Dashboard;
import React, { Component } from "react";
import Layout from "../../components/layout"
import Campaign from "../../ethereum/campaign"
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3"
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes"

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]

        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [{
            header: manager,
            meta: "Address of manager",
            description: "The manager who created this campaign",
            style: { overflowWrap: ' break-word' }
        },
        {
            header: minimumContribution,
            meta: "Minimum Contribution(Wei)",
            description: "Minimum amount of contribution required to become an approver"
        },
        {
            header: requestCount,
            meta: "Counts of request",
            description: "Total requests created by manager"
        },
        {
            header: approversCount,
            meta: "Number of approvers",
            description: "Number of people who have already donated."
        },
        {
            header: web3.utils.fromWei(balance, "ether"),
            meta: "Total Balance",
            description: "Balance of contract in ether"
        }

        ];
        return <Card.Group items={items} />;
    };

    render() {
        return (<Layout> <h1>Show campaigns</h1>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        </Layout >);
    };

};
export default CampaignShow;
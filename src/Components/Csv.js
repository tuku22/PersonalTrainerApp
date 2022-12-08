import {CSVLink} from 'react-csv';
import React, {Component} from 'react';


export default class Csv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.csvLine = React.createRef();
        this.headers = [
            {label: 'First Name', key:'firstname'},
            {label: 'Lastname', key:'lastname'},
            {label: 'Streetaddress', key:'streetaddress'},
            {label: 'Postcode', key:'postcode'},
            {label: 'City', key:'city'},
            {label: 'Email', key:'email'},
            {label: 'Phone', key:'phone'},
        ]
    }

    fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
    }

    loadCustomers = async () => {
        const data = await this.fetchCustomers();
        this.setState({data: data, loading: false}, () => {
            setTimeout(() => {
                this.csvLine.current.link.click();
            });
        });
    }
    
    render() {
        const {data, loading} = this.state;
        return(
            <div>
                <input
                type="button"
                value={loading? "Downloading..." : "Export data to CSV file"}
                onClick={this.loadCustomers}
                disable={loading}
                />
            <CSVLink
            headers={this.CSVLink}
            data={data}
            filename="Customers.csv"
            ref={this.csvLine}
            />
            </div>
        );
    }
}
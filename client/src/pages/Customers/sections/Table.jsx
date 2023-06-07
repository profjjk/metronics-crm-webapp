import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Searchbar } from '../../../components';

const Table = ({ customers }) => {
	const qc = useQueryClient();
	const history = useHistory();
	const { url } = useRouteMatch();
	const [customerList, setCustomerList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	// Search for customers
	useEffect(() => {
		if(searchTerm === '') {
			setCustomerList(customers);
			return;
		}
		setCustomerList(
			customers.filter(customer => {
				return customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					customer.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
					customer.phone.includes(searchTerm)
			})
		);
	}, [searchTerm, customers]);

	return (
		<section>
			<div className={'section-header'}>
				<div>
					<Searchbar
						placeholder={'Search'}
						setSearch={setSearchTerm}
					/>
				</div>
			</div>

			<table>
				<thead>
				<tr className={'tr-customer'}>
					<th>Business Name</th>
					<th>Address</th>
					<th className={'text-center'}>Contact</th>
					<th className={'text-center'}>Phone #</th>
				</tr>
				</thead>

				<tbody>
				{customerList.map(customer => (
					<tr className={'table-item tr-customer clickable'} key={customer._id} onClick={() => {
						qc.setQueryData('submissionType', 'edit');
						qc.setQueryData('selectedCustomer', customer);
						history.push(`${url}/view`);
					}}>
						<td>{customer.businessName}</td>
						<td>
							{customer.address.street1}
							{customer.address.street2 !== '' ? ', ' + customer.address.street2 + ', ' : ', '}
							{customer.address.city}, {customer.address.state} {customer.address.zipcode}
						</td>
						<td className={'text-center'}>{customer.contactName ? customer.contactName : '--'}</td>
						<td className={'text-center'}>{customer.phone}</td>
					</tr>
				))}
				</tbody>
			</table>
			{customerList.length < 1 ? <p className={'empty'}>** No customers to display **</p> : <></>}
		</section>
	)
}

export default Table;

// TODO: add pagination for displaying data
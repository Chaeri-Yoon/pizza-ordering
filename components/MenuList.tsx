import MenuItem from './MenuItem';
import styled from 'styled-components';
import { IBriefMenu } from '../pages';

const Container = styled.div`
    padding: 0 10em;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3em;
`;
export default ({ menuList }: { menuList: IBriefMenu[] }) => {
    return (
        <Container>
            {menuList?.map(menu => <MenuItem key={menu._id} menu={menu} />)}
        </Container>
    )
}
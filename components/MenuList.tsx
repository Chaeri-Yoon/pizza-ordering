import { IMenu } from '../models/menu';

export default ({ menuList }: { menuList: IMenu[] }) => {
    console.log(menuList)
    return (
        <>
            {menuList?.map(menu =>
                <div>
                    <span>{menu.name}</span>
                    <span>{menu.image}</span>
                    <span>{menu.price}</span>
                    <span>{menu.description}</span>
                </div>
            )}
        </>
    )
}
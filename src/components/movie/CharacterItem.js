const CharacterItem = ({character})=>{

            return (
                <tr className="text-yellow-200 text-left border-l-2 border-r-2 border-b border-yellow-200" key={ character?.name}>
                    <td className="lg:text-lg md:text-sm text-xs">{character?.name}</td>
                    <td className="lg:text-lg md:text-sm text-xs">{character?.gender}</td>
                    <td className="lg:text-lg md:text-sm text-xs">{character?.height}</td>
                </tr>
                
            )
};

export default CharacterItem;
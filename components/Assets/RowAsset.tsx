import React from "react";
import { IAssetInfo } from "@/app/IAppState";
import { Copyable } from "../ui/Copyable";

interface IProps {
  assetInfo: IAssetInfo;
}

export const AssetRow: React.FC<IProps> = ({ assetInfo }) => {
  const { asset, address, balance } = assetInfo;
  const [shortAddress, setShortAddress] = React.useState<string>("");
  const [copyableAddress, setCopyableAddress] = React.useState<string>("");
  
  React.useEffect(() => {
    if (address) {
      const address1 = `${address.address.slice(0, 6)}...${address.address.slice(-4)}`;
      setShortAddress(address1);
      setCopyableAddress(address.address);
    }
  }, [address]);

  if (!asset.id) {
    return null;
  }

  const { id, name, type, iconUrl } = asset;

  return (
    <tr key={id}>
      <td className="px-1">
        <div className="flex gap-2 items-center">
          <span className="w-5">{iconUrl ? <img src={iconUrl} width={32} height={32}></img> : null}</span>
          <span>{id}</span>
        </div>
      </td>
      <td className="px-1 text-ellipsis overflow-hidden whitespace-nowrap">{name}</td>
      <td className="px-1">{type}</td>
      <td className="px-1">{address && <Copyable value={address.address} />}</td>
      <td className="px-1">{balance && balance.total}</td>
    </tr>
  );
};

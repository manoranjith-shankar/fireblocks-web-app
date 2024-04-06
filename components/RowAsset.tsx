import React from "react";
import { IAssetInfo } from "@/app/IAppState";
import { Snippet, TableCell, TableRow } from "@nextui-org/react";

interface IProps {
  assetInfo: IAssetInfo;
}

export const AssetRow: React.FC<IProps> = ({ assetInfo }) => {
  const { asset, address, balance } = assetInfo;

  if (!asset.id) {
    return null;
  }

  const { id, name, type, iconUrl } = asset;
  return (
    <TableRow key={id}>
      <TableCell className="px-1">
        <div className="flex gap-2 items-center">
          <span className="w-5">{iconUrl ? <img src={iconUrl} width={32} height={32}></img> : null}</span>
          <span>{id}</span>
        </div>
      </TableCell>
      <TableCell className="px-1 text-ellipsis overflow-hidden whitespace-nowrap">{name}</TableCell>
      <TableCell className="px-1">{type}</TableCell>
      <TableCell className="px-1">{address && <Snippet>{address.address}</Snippet>}</TableCell>
      <TableCell className="px-1">{balance && balance.total}</TableCell>
    </TableRow>
  );
};

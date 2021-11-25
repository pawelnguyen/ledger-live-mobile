// @flow
import React from "react";
import { Trans } from "react-i18next";
import type { DeviceModel } from "@ledgerhq/devices";

const k = 1024; // 1kb unit
const sizes = ["bytes", "kbUnit", "mbUnit"];

/** formats a byte value into its correct size in kb or mb unit talking in account the device block size */
const ByteSize = ({
  value,
  deviceModel,
  decimals = 0,
  firmwareVersion,
  formatFunction
}: {
  value: number,
  deviceModel: DeviceModel,
  decimals?: number,
  firmwareVersion: string,
  formatFunction?: (val: number) => number
}) => {
  if (!value) return "–";

  const blockSize = deviceModel.getBlockSize(firmwareVersion);

  // FIXME it should be on live-common side
  const bytes = Math.ceil(value / blockSize) * blockSize;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const dm = Math.max(0, decimals);
  const pureSize = parseFloat(bytes / Math.pow(k, i));
  const formattedSize = formatFunction ? formatFunction(pureSize) : pureSize
  const size = formattedSize.toFixed(dm)

  return (
    <Trans
      i18nKey={`byteSize.${sizes[i]}`}
      values={{ size }}
    />
  );
};

export default ByteSize;

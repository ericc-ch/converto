import { Box, Radio, Text, Title } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import type { MetaFunction } from "@remix-run/cloudflare";
import { z } from "zod";
import { megabytes } from "~/utils/size";

export const meta: MetaFunction = () => {
  return [
    { title: "Converto | Free Image Converter" },
    {
      name: "description",
      content: "[FILL THIS]",
    },
  ];
};

const SIZE_MAX = megabytes(20);
const OPTIONS = ["jpeg", "png", "webp", "avif"] as const;

const schema = z.object({
  output: z.enum(OPTIONS),
});

export default function Index() {
  return (
    <Box>
      <Title order={1}>File Converter</Title>
      <Text>Dead simple, just drop your file.</Text>

      <Dropzone
        maxSize={SIZE_MAX}
        onDrop={console.log}
        accept={IMAGE_MIME_TYPE}
      >
        Drop
      </Dropzone>

      <Radio.Group
        name="output"
        label="Output Format"
        description="Select the format you want your image in."
        withAsterisk
      >
        {OPTIONS.map((option) => (
          <Radio key={option} value={option} label={option} />
        ))}
      </Radio.Group>
    </Box>
  );
}

import { Box, Group, Radio, Stack, Text, Title } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import type { MetaFunction } from "@remix-run/cloudflare";
import { IconCheck, IconUpload } from "@tabler/icons-react";
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
  images: z
    .array(
      z.object({
        size: z.number().min(0).max(SIZE_MAX),
      })
    )
    .min(1),
  output: z.enum(OPTIONS),
});

export default function Index() {
  const form = useForm();

  return (
    <Box style={{ paddingInline: "1rem", paddingBlockStart: "4rem" }}>
      <Stack gap="xl" w="min(400px, 100%)" mx="auto">
        <Box>
          <Title ta="center" order={1}>
            File Converter
          </Title>
          <Text ta="center">Dead simple, just drop your file.</Text>
        </Box>

        <Dropzone
          maxSize={SIZE_MAX}
          onDrop={console.log}
          accept={IMAGE_MIME_TYPE}
        >
          <Box h={144}>
            <Dropzone.Idle>
              <Stack justify="center" align="center" h="100%">
                <IconUpload width={64} height={64} />
                <Text>Drop it like its hot</Text>
              </Stack>
            </Dropzone.Idle>

            <Dropzone.Accept>
              <Stack justify="center" align="center" h="100%">
                <IconCheck width={64} height={64} />
                <Text>Drop it like its hot</Text>
              </Stack>
            </Dropzone.Accept>

            <Dropzone.Reject>Nah man, check the file type</Dropzone.Reject>
          </Box>
        </Dropzone>

        <Radio.Group
          name="output"
          label="Output Format"
          description="Select the format you want your image in."
          withAsterisk
        >
          <Stack mt="sm" gap="sm">
            {OPTIONS.map((option) => (
              <Radio key={option} value={option} label={option} />
            ))}
          </Stack>
        </Radio.Group>
      </Stack>
    </Box>
  );
}

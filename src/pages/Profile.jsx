import { useState } from "react";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";

import {
  AccountCircle,
  ContentCopy,
  DeleteOutline,
  LockReset,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  // Replace these with your actual user/auth values.
  const username = "TRAINER SIERRA";
  const email = "trainersierra@example.com";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy profile link:", error);
    }
  };

  return (
    <div>
      <Box
        component="main"
        sx={{
          maxWidth: "100%",
          mx: "auto",
          mt: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.8fr 1.2fr",
            },
            gap: {
              xs: 4,
              md: 7,
            },
            alignItems: "center",
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: {
                  xs: 110,
                  sm: 135,
                },
                height: {
                  xs: 110,
                  sm: 135,
                },
                bgcolor: "#58d1bf",
                color: "#fff",
                border: 4,
                borderColor: "#58d1bf",
              }}
            >
              <AccountCircle
                sx={{
                  fontSize: {
                    xs: 105,
                    sm: 130,
                  },
                }}
              />
            </Avatar>

            <Box
              sx={{
                bgcolor: "#58d1bf",
                color: "#fff",
                borderRadius: 999,
                px: 4,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
              >
                {username}
              </Typography>
            </Box>

            <PokemonDecoration />
          </Stack>
          <Stack spacing={1.5}>
            <ProfileField
              icon={<AccountCircle fontSize="small" />}
              value={username}
            />

            <ProfileField value={email} />

            <Button
              variant="contained"
              startIcon={<LockReset />}
              sx={{
                borderRadius: 999,
                bgcolor: "#58d1bf",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#45bfae",
                },
                py: 1.15,
                fontSize: "0.7rem",
                fontFamily: "monospace",
                fontWeight: 700,
                justifyContent: "left",
              }}
            >
              RESET PASSWORD
            </Button>

            <Button
              variant="contained"
              startIcon={<ContentCopy />}
              onClick={handleCopyLink}
              sx={{
                borderRadius: 999,
                bgcolor: "#58d1bf",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#45bfae",
                },
                py: 1.15,
                fontSize: "0.7rem",
                fontFamily: "monospace",
                fontWeight: 700,
                justifyContent: "left",
              }}
            >
              {copied ? "LINK COPIED!" : "COPY YOUR LINK"}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Button
              color="error"
              variant="contained"
              startIcon={<DeleteOutline />}
              sx={{
                borderRadius: 999,
                py: 1.15,
                fontSize: "0.7rem",
                fontFamily: "monospace",
                fontWeight: 700,
                justifyContent: "left",
              }}
            >
              DELETE ACCOUNT
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

function ProfileField({ icon, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,

        minHeight: 44,

        bgcolor: "#58d1bf",
        color: "#fff",

        borderRadius: 999,

        px: 2.5,
      }}
    >
      {icon}

      <Typography
        sx={{
          fontSize: "0.7rem",
          fontFamily: "monospace",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
function PokemonDecoration() {
  return (
    <Box
      sx={{
        position: "relative",

        width: 105,
        height: 135,

        mt: 3,

        bgcolor: "#ffc107",

        border: 4,
        borderColor: "#58d1bf",

        borderRadius: 3,

        transform: "rotate(-4deg)",

        boxShadow: (theme) =>
          `-7px 7px 0 ${theme.palette.info.main},
           6px -4px 0 ${theme.palette.secondary.main}`,
      }}
    >
      <Box
        sx={{
          position: "absolute",

          top: 15,
          left: 14,

          width: 65,
          height: 48,

          bgcolor: "#58d1bf",

          border: 4,
          borderColor: "#58d1bf",

          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
          }}
        >
          ⚡
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 14,
          bottom: 20,

          width: 28,
          height: 10,

          bgcolor: "#58d1bf",
          borderRadius: 1,

          "&::after": {
            content: '""',
            position: "absolute",
            width: 10,
            height: 28,
            left: 9,
            top: -9,
            bgcolor: "#58d1bf",
            borderRadius: 1,
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: 12,
          bottom: 29,

          width: 14,
          height: 14,

          bgcolor: "#58d1bf",
          border: 2,
          borderColor: "#58d1bf",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
}

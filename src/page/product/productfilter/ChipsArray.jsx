import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useEffect, useState } from "react";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({
  type,
  categories,
  clearProductCategories,
}) {
  const [chipData, setChipData] = useState([]);

  useEffect(() => {
    console.log("------------>", categories);
    setChipData(
      categories?.map((el, ind) => {
        return { key: ind, label: el };
      })
    );
  }, [categories]);

  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    // clearProductCategories(chipToDelete.label);
    // const arr = chipData.filter((chip) => chip.key !== chipToDelete.key)
    // const productCategories = arr.map(el => el?.label)
    clearProductCategories(type, chipToDelete.label)
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      style={{marginBottom:"20px"}}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}

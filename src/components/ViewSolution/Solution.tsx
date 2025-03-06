import { POPUP_TYPES } from "@/constants";
import { useDoubtContext } from "../Contexts/DoubtContext";

const Solution = ({callbackForData}: {callbackForData: (type: string, data: unknown) => void}) => {
    const {selectedDoubt} = useDoubtContext()
    const {text} = selectedDoubt || {}
  return (
    <div className="p-4">
      <div className="p-2">{text}</div>
      <div className="p-2">
        <span
          className="text-blue-500"
          onClick={() => {
            callbackForData(POPUP_TYPES.VIDEO, {
              url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            })
          }}
        >
          Video Solution
        </span>
      </div>
      <div className="p-2">
        <span
          className="text-blue-500"
          onClick={() => {
            callbackForData(POPUP_TYPES.HTML, {
              url: "https://ap-south-1-staging-doubts.s3.ap-south-1.amazonaws.com/hackathon/simulation_refined_kinematics.html?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiAenGFG%2FP%2Bv6JWukZvlDcqd83Dy9rPK5BkpgMn7i67PoQIhAIHrA2uY6H19%2FKwWxfMoTptXuebfW8siw%2F3INDizfLlQKs4ECC8QABoMNjQ2Mjg5NjUwMzUzIgxMEEOHPOJhvrKkMiwqqwQaOCw2F8SS8nikXBKMifb0XuEZ6YkRwkBeMBzL8mWBd3iUoZkIub4GcKgAYfXTL1LdyD5FGmOzBf1WEZT4Gqu4F1HgAdxx36aJdcyHA8Ad5ZeVrOfRfsnilFcc8ItPCkvQC52PLwckEaZY46Sis6t3nRyABmZ8Tc8jovFg2eT6f0jbptPc%2B1pbyN%2FeoPN1%2F%2B0t%2FVbnghvnckShiQyxXS5gMzhcfp9kuMGIbibRunr987Mg8bXw82v%2BpPIiO5IPRj0DC%2Fwqh%2B6FpRaomNaICi%2BXAXlfEDbqHPCgBK7g02o8sGSSGINRZ1g9wZiRrBiZ5hm8rEN7pFCG%2BjdnqSYToTMEqS%2F58xkTpAHpoQRZ8EKNo%2B30aWf5htgy9qQjNzItKgM5eLxN497oRganGMfQl7i%2BcZqKaAbPCAKlrads3WBHw9Ft9Bgovt3y7bpLgJBFl7jIzi8MBHPk3VTBBmCrCvaAB3JfWdPHxMAiheIrs0QJ%2FLqNiLarv83Tren1l%2BxPBvBazpCIY52%2Bd9gm9pHH01%2F%2FUh1uVQ5X%2FQlzr9YYYiENfwY8goxiq%2FJ1PRiC%2BzTObaiAn1zUiHqAHmVrghHXoT2SwHU1XMuzASUga6qvw%2BPtLJDR8Jd5i7RnHjcRvc0%2FXxd2Ngp4V%2FZeMqJsrVphRsg8XAyOX8TFXp0zyRkKF0dd1ZTmbYJx5cz96jqW9LLDkLNfKdewLh8hdF89kocleGXwLwsPX4XSKGcoF1QwudqmvgY6xQLOKpSeMZUAZ3Ak8KSwQ5FkDslbxJA1HzBRG71gxuZZtbzcCN14dQ6di536%2BnviWZsXZBilBm8kcB8w2FmRPXx2mwqJVnoWjtlHTSIn3zwmrHEeYEb8Lxk%2BS9PTljML%2BEOHmzy%2BX6%2BHtwD%2BlS%2BO8LAWwKj1fuAth3isU9p%2FHD%2F6eyuzv6Xeb1DcmTpIzdkZiHN8TZmSDNyQFWF%2BF9hQ8LpH8wh1WPgbBQab47kKRP7Be48reGrqx3o4hvWalr31RpShjashYNtnN5r2Jg3XQnu1BOappyyQK1r3k9SLFYoHVWgF%2BYvuX2WF05wMV3O1gThun0DDr0gX%2FVMucVxhiDwP9O4nbjtwhqdpua%2FCNKbTMvD2DrfMQHZTsoOSbrOOqcripeh3zJns7K6CJX4At2jAq08fTOmvHd9fMqnET4pbYlCr8IAl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZM6O5OKYZJ5RFAD4%2F20250306%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250306T141252Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=4463915303b0910d06edf795dfd3d0794ea0d125f3fba407012ba6833aa62e49"
            })
          }}
        >
          Visualize Simulation
        </span>
      </div>
    </div>
  );
};

export default Solution;

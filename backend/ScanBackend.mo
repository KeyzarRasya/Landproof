import Base "mo:base/Prelude";

import Prim "mo:base/Prim";
import Text "mo:base/Text";
import Blob "mo:base/Blob";

actor ScanBackend {

  stable var storedText : Text = "";
  stable var storedImage : Blob = Blob.fromArray([]);

  public shared ({ caller }) func uploadData(imageData : Blob, textData : Text) : async Text {
    storedImage := imageData;
    storedText := textData;
    return "Data berhasil diupload oleh " # debug_show (caller);
  };

  public query func getStoredText() : async Text {
    return storedText;
  };
};

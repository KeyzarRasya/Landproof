import Base "mo:base/Prelude";

actor class Backend() {
  stable var counter = 0;

  // Get the current count
  public query func get() : async Nat {
    counter;
  };

  // Increment the count by one
  public func inc() : async () {
    counter += 1;
  };

  // Add `n` to the current count
  public func add(n : Nat) : async () {
    counter += n;
  };

  public func sayhello(word : Text) : async Text {
    let hello : Text = "Hello" # word;
    return hello;
  };
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import { RootState } from "../../store";
import { updateGoal, createGoal } from "../../store/goals/actions";
import { Goal } from "../../types/Goal";

interface GoalManagerProps {
  goal?: Goal;
  onClose: () => void;
}

const GoalManager: React.FC<GoalManagerProps> = ({ goal, onClose }) => {
  const dispatch = useDispatch();

  // Local state
  const [name, setName] = useState(goal?.name ?? "");
  const [amount, setAmount] = useState(goal?.amount ?? 0);
  const [icon, setIcon] = useState(goal?.icon ?? "🎯");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const isEditing = Boolean(goal);

  // Handle creation or update
  const handleSave = () => {
    const updatedGoal: Goal = {
      ...goal,
      name,
      amount,
      icon,
    };

    if (isEditing) {
      dispatch(updateGoal(updatedGoal));
    } else {
      dispatch(createGoal(updatedGoal));
    }

    onClose();
  };

  return (
    <div className="goal-manager">
      <h2>{isEditing ? "Edit Goal" : "Create Goal"}</h2>

      {/* ICON PICKER */}
      <div className="form-group">
        <label>Icon</label>
        <div
          className="icon-selector"
          style={{
            fontSize: "2rem",
            cursor: "pointer",
            border: "1px solid #ddd",
            display: "inline-block",
            padding: "8px",
            borderRadius: "5px",
          }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {icon}
        </div>

        {showEmojiPicker && (
          <div style={{ position: "absolute", zIndex: 5 }}>
            <Picker
              title="Pick an emoji"
              emoji="sparkles"
              onSelect={(emoji: any) => {
                setIcon(emoji.native);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
      </div>

      {/* NAME */}
      <div className="form-group">
        <label>Goal Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter goal name"
        />
      </div>

      {/* AMOUNT */}
      <div className="form-group">
        <label>Goal Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
        />
      </div>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>

        <button onClick={handleSave} className="btn-primary">
          {isEditing ? "Save Changes" : "Create Goal"}
        </button>
      </div>
    </div>
  );
};

export default GoalManager;

declare module "react-chat-elements" {
  export class ChatList extends React.Component<ChatListProps, ChatListState> {}
  export class ChatItem extends React.Component<ChatItemProps, ChatItemState> {}
  export class Button extends React.Component<ButtonProps, ButtonState> {}
  export class Input extends React.Component<InputProps, InputState> {}
  export class Navbar extends React.Component<NavbarProps, NavbarState> {}

  export class Dropdown extends React.Component<DropdownProps, DropdownState> {}
  export class MessageBox extends React.Component<
    MessageBoxProps,
    MessageBoxState
  > {}

  export class MessageList extends React.Component<
    MessageListProps,
    MessageListState
  > {}
}

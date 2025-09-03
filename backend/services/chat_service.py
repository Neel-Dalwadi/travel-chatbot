from agno_agent.agent import agent


def process_user_message(user_input: str) -> str:
    """
    Process input from user, run through Agno Agent, and store interaction.
    """
    try:
        bot_response = agent.run(user_input)
        print('---' * 30)
        print(bot_response)
        print(bot_response.content)
        print('---' * 30)
        # save_chat(user_input, bot_response)
        # print(f"User: {user_input}\nBot: {bot_response}")
        return bot_response.content
    except Exception as e:
        raise ValueError(f"Sorry, an error occurred: {str(e)}")

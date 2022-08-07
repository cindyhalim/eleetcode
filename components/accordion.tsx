import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { Box, Flex, Text } from "rebass";

interface IAccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<IAccordionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const ICON_DIMENSION_IN_PX = 15;

  const handleOnClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ marginY: 20 }}>
      <Flex
        sx={{ alignItems: "center", cursor: "pointer" }}
        onClick={handleOnClick}
      >
        <Image
          src="/icons/right.png"
          alt="accordion-icon"
          width={ICON_DIMENSION_IN_PX}
          height={ICON_DIMENSION_IN_PX}
        />
        <Text as="h3" sx={{ fontWeight: 700 }}>
          {title}
        </Text>
      </Flex>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            style={{ padding: ICON_DIMENSION_IN_PX }}
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
